

const boxes = document.querySelectorAll('.box');
        const declare = document.getElementById('declaration');
        console.log(boxes)

        let current = true;
        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]   
        ];

        boxes.forEach( (box) => {
            box.addEventListener('click', () => {
                if(box.innerHTML === '' && current) {
                    box.innerHTML = 'X';
                    current = false;
                }else{
                    if(box.innerHTML === ''){
                        box.innerHTML = 'O';    
                        current = true;
                    }
                }
                checkWin();

            });
        });
        
        function checkWin(){
            for( wins of win){
                let val1 = boxes[wins[0]].innerHTML;
                let val2 = boxes[wins[1]].innerHTML;
                let val3 = boxes[wins[2]].innerHTML;
                if (val1 != '' && val2 != '' && val3 != '') {
                    if (val1 == val2 && val2 == val3) {
                        endGame(val1);
                        return;
                    }
                }
            }

            // Check for a draw
            if (!Array.from(boxes).some(box => box.innerHTML === '')) {
                console.log('It\'s a draw!');
                endGame(null);
            }
        }

        function endGame(winner) {
            // Disable all boxes
            boxes.forEach(box => box.disabled = true);
            // Show restart button
            const restartButton = document.querySelector('.restart-button');
            restartButton.style.display = 'block';
            // Add winner or draw class
            if (winner) {
                boxes.forEach(box => box.classList.add('winner'));
                declare.innerHTML = `<span style="color: green; font-size: 24px;font-weight:bold">Winner is ${winner}</span>`;
            } else {
                boxes.forEach(box => box.classList.add('draw'));
                declare.innerHTML = `<span style="color: orange; font-size: 24px;font-weight:bold">It's a draw!</span>`;
            }
            // Add event listener to restart button
            restartButton.addEventListener('click', () => {
                // Reset game state
                current = true;
                boxes.forEach(box => {
                    box.innerHTML = '';
                    box.disabled = false;
                    box.classList.remove('winner', 'draw');
                });
                restartButton.style.display = 'none';
                declare.innerHTML = '';
            });
        }