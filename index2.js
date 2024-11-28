function loadBlocks() {
    fetch('load.php') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(blocks => {
            const container = document.getElementById('wide_block'); 
            container.innerHTML = ''; 

            blocks.forEach(block => {
                const htmlBlock = `
                    <div class="c">
                        <input type="checkbox">
                        <div class="title">
                            <h1>${block.title}</h1>
                        </div>
                        <div class="p">
                            <p>${block.content}</p>
                        </div>
                    </div>`;
                container.innerHTML += htmlBlock;
            });
        })
        .catch(error => {
            console.error('Error fetching blocks:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadBlocks);
setInterval(loadBlocks, 5000);