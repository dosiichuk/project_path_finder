export const prepareCellData = function(buttonText){
  const cellData = {cells: [], buttonText};
  for (let i=1; i<=10; i++){
    for(let j=1; j<=10; j++){
      cellData.cells.push({
        row: i,
        column: j
      });
    }
  }
  return cellData;
};