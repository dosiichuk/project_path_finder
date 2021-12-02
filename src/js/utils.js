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

export const prepareAdjacentCells = function(dataset){
  let row = parseInt(dataset.row);
  let column = parseInt(dataset.column);
  let cellAboveTheSelectedCell = document.querySelector(`.cell[data-row="${row - 1}"][data-column="${column}"]`);
  let cellBelowTheSelectedCell = document.querySelector(`.cell[data-row="${row + 1}"][data-column="${column}"]`);
  let cellRightOfTheSelectedCell = document.querySelector(`.cell[data-row="${row}"][data-column="${column + 1}"]`);
  let cellLeftOfTheSelectedCell = document.querySelector(`.cell[data-row="${row}"][data-column="${column - 1}"]`);
  let cellTopLeft = document.querySelector(`.cell[data-row="${row - 1}"][data-column="${column-1}"]`);
  let cellTopRight = document.querySelector(`.cell[data-row="${row - 1}"][data-column="${column + 1}"]`);
  let cellBottomRight = document.querySelector(`.cell[data-row="${row + 1}"][data-column="${column + 1}"]`);
  let cellBottomLeft = document.querySelector(`.cell[data-row="${row + 1}"][data-column="${column - 1}"]`);
  const adjacentCells = [cellAboveTheSelectedCell, cellBelowTheSelectedCell, cellRightOfTheSelectedCell, cellLeftOfTheSelectedCell];
  const cornerCells = [cellTopLeft, cellTopRight, cellBottomRight, cellBottomLeft];
  return [adjacentCells, cornerCells];
};