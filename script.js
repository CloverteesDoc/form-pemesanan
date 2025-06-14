document.getElementById("formPemesanan").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    nama: this.nama.value,
    telepon: this.telepon.value,
    instagram: this.instagram.value,
    alamat: this.alamat.value,
    detailPesanan: document.getElementById("totalDisplay").innerText,
    total: hitungTotalPcs()
  };

  fetch("https://script.google.com/macros/s/AKfycby_64OHzkY10EM_7zCMRX_cTHCFlodRiDyYxPGObEU5/dev", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    alert("Pesanan berhasil dikirim!");
  })
  .catch(err => {
    console.error("Gagal:", err);
    alert("Terjadi kesalahan saat mengirim.");
  });
});
