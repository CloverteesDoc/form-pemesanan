const warnaList = [
  "BLACK", "WHITE", "SOFT PINK", "NEON PINK", "RED", "MAROON", "LILAC", "SKY BLUE",
  "ROYAL BLUE", "NAVY BLUE", "NEON YELLOW", "TOSCA", "GREEN", "FOREST GREEN",
  "YELLOW", "ORANGE", "MUSTARD"
];

let warnaIndex = 0;

function tambahWarna() {
  warnaIndex++;
  const container = document.getElementById('warnaContainer');
  const div = document.createElement('div');
  div.className = "warna-section";

  let html = `
    <label>Warna Kaos/Dress #${warnaIndex}:</label>
    <select name="warna${warnaIndex}" required onchange="updateTotal()">
      <option value="">-- Pilih Warna --</option>
      ${warnaList.map(w => `<option value="${w}">${w}</option>`).join('')}
    </select>

    <h4>Dewasa</h4>
    <table>
      <tr><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>2XL</th><th>3XL</th></tr>
      <tr>
        ${["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(size =>
          `<td><input type="number" name="dewasa_${warnaIndex}_${size}" min="0" value="0" oninput="updateTotal()"></td>`
        ).join('')}
      </tr>
    </table>

    <h4>Anak-Anak</h4>
    <table>
      <tr><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th></tr>
      <tr>
        ${["XS", "S", "M", "L", "XL"].map(size =>
          `<td><input type="number" name="anak_${warnaIndex}_${size}" min="0" value="0" oninput="updateTotal()"></td>`
        ).join('')}
      </tr>
    </table>

    <h4>Perincian Desain</h4>
    <table>
      <tr><th>Bagian Depan</th><th>Bagian Belakang</th><th>Lengan</th></tr>
      <tr>
        <td>
          <textarea name="desain_depan_${warnaIndex}" rows="2"></textarea>
          <input type="file" name="file_depan_${warnaIndex}" multiple>
        </td>
        <td>
          <textarea name="desain_belakang_${warnaIndex}" rows="2"></textarea>
          <input type="file" name="file_belakang_${warnaIndex}" multiple>
        </td>
        <td>
          <textarea name="desain_lengan_${warnaIndex}" rows="2"></textarea>
          <input type="file" name="file_lengan_${warnaIndex}" multiple>
        </td>
      </tr>
    </table>
  `;

  div.innerHTML = html;
  container.appendChild(div);
  updateTotal();
}

function updateTotal() {
  const container = document.getElementById('warnaContainer');
  const sections = container.querySelectorAll('.warna-section');
  let totalOutput = '';
  let totalSemua = 0;

  sections.forEach((section, index) => {
    const warna = section.querySelector('select').value;
    const inputs = section.querySelectorAll('input[type="number"]');
    let dewasa = {}, anak = {}, subtotal = 0;

    inputs.forEach(input => {
      const jumlah = parseInt(input.value) || 0;
      if (jumlah > 0) {
        const [jenis, , size] = input.name.split('_');
        if (jenis === 'dewasa') {
          dewasa[size] = (dewasa[size] || 0) + jumlah;
        } else {
          anak[size] = (anak[size] || 0) + jumlah;
        }
        subtotal += jumlah;
      }
    });

    if (warna && (Object.keys(dewasa).length > 0 || Object.keys(anak).length > 0)) {
      totalOutput += `${index + 1}. Warna       : ${warna}\n`;
      if (Object.keys(dewasa).length > 0) {
        totalOutput += `   Dewasa      : ${Object.entries(dewasa).map(([s, c]) => `${s} ${c} pcs`).join(', ')}\n`;
      }
      if (Object.keys(anak).length > 0) {
        totalOutput += `   Anak-anak : ${Object.entries(anak).map(([s, c]) => `${s} ${c} pcs`).join(', ')}\n`;
      }
      totalSemua += subtotal;
    }
  });

  document.getElementById('totalDisplay').textContent = `Total Semua: ${totalSemua} pcs\n\n${totalOutput}`;
}

window.onload = tambahWarna;

document.getElementById("formPemesanan").addEventListener("submit", function(e) {
  e.preventDefault();

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzrejiDYPqEVkA0qgTpurh8k8mqt4VbFCuZehNXuc-uxtSHe5dvHtAczJpVN_o96WzwPg/exec';
  const form = document.getElementById("formPemesanan");
  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      alert("Pesanan berhasil dikirim!");
      form.reset();
    })
    .catch(error => {
      alert("Terjadi kesalahan saat mengirim: " + error.message);
    });
});
