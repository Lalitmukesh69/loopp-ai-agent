import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "mcp-remote", "https://mcp.supabase.com/mcp"]
  });

  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: {} }
  );

  await client.connect(transport);
  
  const content = fs.readFileSync('supabase/functions/create-checkout-session/index.ts', 'utf8');

  console.log('Calling deploy_edge_function for create-checkout-session...');
  const result = await client.callTool({
    name: 'deploy_edge_function',
    arguments: {
      project_id: 'uxlisdceefbxxobxlpaz',
      name: 'create-checkout-session',
      entrypoint_path: 'index.ts',
      verify_jwt: false,
      files: [
        {
          name: 'index.ts',
          content: content
        }
      ]
    }
  });

  fs.writeFileSync('checkout_deploy_result.txt', JSON.stringify(result, null, 2));
  console.log('Deployment Result Saved.');
  
  await client.close();
}

main().catch(console.error);
