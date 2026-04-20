<button
  onClick={() => {
    const prompt = prompt("Describe the scene you want to generate");
    fetch("http://localhost:3000/ai/scene", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        project_id: project.id,
        prompt
      })
    })
      .then(r => r.json())
      .then(out => alert(out.output));
  }}
>
  + AI Scene
</button>
