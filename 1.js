// function hitungHargaBarang(hargaDasar, kualitas, kuantitas) {
//     // Validasi input
//     if (typeof hargaDasar !== 'number' || typeof kualitas !== 'string' || typeof kuantitas !== 'number') {
//       return "Input tidak valid. Pastikan harga dasar dan kuantitas berupa angka, dan kualitas berupa string.";
//     }
  
//     // Menentukan faktor kualitas
//     let faktorKualitas = 1;
//     switch (kualitas.toLowerCase()) {
//       case 'baik':
//         faktorKualitas = 1.2; // Harga 20% lebih tinggi
//         break;
//       case 'sedang':
//         faktorKualitas = 1; // Harga normal
//         break;
//       case 'buruk':
//         faktorKualitas = 0.8; // Harga 20% lebih rendah
//         break;
//       default:
//         return "Kualitas tidak valid. Pilih antara 'baik', 'sedang', atau 'buruk'.";
//     }
  
//     // Menghitung harga barang
//     const hargaBarang = hargaDasar * faktorKualitas;
  
//     // Menghitung total harga
//     const totalHarga = hargaBarang * kuantitas;
  
//     // Mengembalikan hasil dalam bentuk objek

//     return {
//      total :`
//      Barang A
//      Harga barang = ${hargaBarang}
//      Total harga  = ${totalHarga}
//      Kualitas     = ${kualitas}
//      `
//     };
//   }
  
//   // Contoh penggunaan
//   const hasil = hitungHargaBarang(10000, 'baik', 5);
//   console.log(hasil);


  function hitungBarang(jenisBarang, kuantitas) {
    let hargaBarang, hargaDibayar, totalHarga
    let potongan=0;
   if(jenisBarang == 'A'){//Barang A
        hargaBarang = 4550;
        if(kuantitas >= 13){
            potongan = 231 * kuantitas;
        }
        totalHarga = hargaBarang * kuantitas;
        hargaDibayar = totalHarga - potongan;
   } else if(jenisBarang == 'B'){//barang B
        hargaBarang = 5330;
        totalHarga = hargaBarang * kuantitas;
        if(kuantitas >= 7){
         potongan = 23 / 100 * totalHarga;
        }
        hargaDibayar = totalHarga - potongan;
   }else if(jenisBarang == 'C'){//barang C
    hargaBarang = 8653;
    totalHarga = hargaBarang * kuantitas;
    hargaDibayar = totalHarga;
   }
console.log("-Total Harga Barang : ",totalHarga);
console.log("-Potongan : ",potongan);
console.log("-Total Yang Harus di Bayar : ",hargaDibayar);
  };
  
  // Contoh penggunaan
hitungBarang('A',13);