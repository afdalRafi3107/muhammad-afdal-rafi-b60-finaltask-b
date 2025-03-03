function drawImage(size) {
    let pattern = "";
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if ((i + j) % 2 === 0) {
          pattern += " *";
        } else {
          pattern += " #";
        }
      }
      pattern += "\n"; // Pindah baris setelah setiap baris selesai
    }
    console.log(pattern);
  }
  
  // Contoh penggunaan:
  drawImage(5);