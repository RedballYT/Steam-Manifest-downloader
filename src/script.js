async function downloadManifest() {
  const gameId = document.getElementById("gameId").value.trim();
  const status = document.getElementById("status");

  if (!gameId) {
    status.innerText = "❗ Bitte gib eine gültige Steam Game ID ein.";
    return;
  }

  const zipUrl = `https://manifest.youngzm.com/${gameId}.zip`;
  status.innerText = "🔎 Lade ZIP-Datei herunter...";

  try {
    const response = await fetch(zipUrl);

    if (!response.ok) {
      status.innerText = "❌ ZIP-Datei nicht gefunden oder nicht erreichbar.";
      return;
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `steam_manifest_${gameId}.zip`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);

    status.innerHTML = `✅ ZIP für AppID ${gameId} wurde erfolgreich heruntergeladen.`;
  } catch (err) {
    status.innerText = "⚠️ Fehler beim Herunterladen.";
    console.error(err);
  }
}
