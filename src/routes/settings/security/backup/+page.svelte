<script lang="ts">
    import { type keystore } from '$lib/wallet/common';

    let importedKeystore = $state<keystore | null>(null); 
    let errorMessage = $state(''); 

    function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      errorMessage = '请上传JSON文件';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        importedKeystore = JSON.parse(jsonString);

        if (!importedKeystore?.crypto || !importedKeystore.version) {
          throw new Error('Invalid keystore format');
        }
        errorMessage = ''; 
      } catch (e:any) {
        errorMessage = `Failed to parse keystore: ${e.message}`;
        importedKeystore = null;
      }
    };
    reader.readAsText(file);
  }



</script>

<h1>导入Keystore</h1>
  <input type="file" accept=".json" onchange={handleFileUpload} />
  {#if errorMessage}
    <p style="color: red">{errorMessage}</p>
  {/if}
  {#if importedKeystore}
    <h2>导入成功</h2>
    <pre>{JSON.stringify(importedKeystore, null, 2)}</pre>
  {/if}


  <style>
    input {
      margin: 10px 0;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      overflow-x: auto;
    }
  </style>