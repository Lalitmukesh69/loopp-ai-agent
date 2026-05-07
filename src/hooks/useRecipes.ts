import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SYSTEM_RECIPES, SystemRecipe } from '@/data/systemRecipes';

export interface Recipe extends SystemRecipe {
  is_system?: boolean;
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(SYSTEM_RECIPES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        const customRecipes: Recipe[] = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || '',
          prompt: r.prompt,
          icon: r.icon || '/',
          category: r.category as any,
          is_system: false,
        }));
        setRecipes([...SYSTEM_RECIPES, ...customRecipes]);
      }
      setLoading(false);
    }
    
    fetchRecipes();
  }, []);

  return { recipes, loading };
}
