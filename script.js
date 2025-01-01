// Function to calculate and display results
function calculate() {
  // Retrieve input values
  const kv = parseFloat(document.getElementById('kv').value);
  const voltage = parseFloat(document.getElementById('voltage').value);
  const propDiameter = parseFloat(document.getElementById('propDiameter').value);
  const statorDiameter = parseFloat(document.getElementById('statorDiameter').value);
  const statorHeight = parseFloat(document.getElementById('statorHeight').value);

  // Calculate RPM (revolutions per minute)
  const rpm = kv * voltage;

  // Calculate tip speed in surface feet per minute (SFPM)
  const tipSpeedSFPM = (Math.PI * propDiameter * rpm) / 12; // Convert inches to feet

  // Convert SFPM to miles per hour (mph)
  const tipSpeedMPH = tipSpeedSFPM * 0.011363636; // Conversion factor from SFPM to mph

  // Calculate tip speed in Mach number
  const machNumber = tipSpeedMPH / 767; // Speed of sound at sea level in mph

  // Calculate stator volume
  const statorVolume = Math.PI * Math.pow(statorDiameter / 2, 2) * statorHeight;

  // Calculate propeller area
  const propArea = Math.PI * Math.pow(propDiameter / 2, 2);

  // Calculate volume to area ratio (mm^3 per square inch)
  const volumeToAreaRatio = statorVolume / propArea; // No need for conversion

  // Calculate motor size (stator diameter * stator height)
  const motorSize = `${statorDiameter.toFixed(0)}${statorHeight < 10 ? '0' : ''}${statorHeight.toFixed(0)}`;

  // Display results
  const resultsDiv = document.getElementById('log');
  const newEntry = document.createElement('div');
  newEntry.classList.add('log-entry');
  newEntry.innerHTML = `
    <span class="line">
      <b>Search Results:</b> Motor Size: ${motorSize},KV: ${kv}, Stator Volume: ${statorVolume.toFixed(2)} mm³, Prop Area: ${propArea.toFixed(2)} sq/in, RPM: ${rpm.toFixed(2)}
    </span>
    <span class="line">
      Prop Tip Speed MPH: ${tipSpeedMPH.toFixed(2)}, Mach: ${machNumber.toFixed(2)}, V/A Ratio: ${volumeToAreaRatio.toFixed(2)} mm³/in²
    </span>
  `;
  resultsDiv.prepend(newEntry);

  // Limit displayed search results to 100
  const entries = resultsDiv.querySelectorAll('.log-entry');
  if (entries.length > 100) {
    entries[entries.length - 1].remove();
  }
}
