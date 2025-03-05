function drawImage(n) {

  if (n % 2 === 0) {
      console.log("Huruf Harus Ganjil");
      return;
  }
  

  for (let i = 0; i < n; i++) {
      let numSpaces = Math.abs(Math.floor(n / 2) - i);
      
      let line = " ".repeat(numSpaces);
      
      for (let j = 0; j < n - 2 * numSpaces; j++) {
          if ((i + j) % 2 === 0) {
              line += "#";
          } else {
              line += "*";
          }
      }
      console.log(line);
  }
}

// Pemanggilan fungsi dengan parameter 5
drawImage(7);
