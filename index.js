// TOWER OF HANOI :- Amar Khamkar

const input = document.querySelector('input');
const button = document.querySelector('button');
const rodAElement = document.getElementById('A');
const rodBElement = document.getElementById('B');
const rodCElement = document.getElementById('C');
let towerOfHanoi;
const colors = [
    "#FF6347", // Tomato
    "#4682B4", // Steel Blue
    "#32CD32", // Lime Green
    "#FFD700", // Gold
    "#FF69B4", // Hot Pink
    "#00CED1", // Dark Turquoise
    "#FF4500", // Orange Red
    "#DA70D6", // Orchid
    "#40E0D0", // Turquoise
    "#BA55D3"  // Medium Orchid
];

class Rod {
    constructor(value, element) {
        this.value = value;
        this.element = element;
        this.disks = [];
    }
    push(disk) {
        const diskElement = document.createElement('div');
        diskElement.className = 'disk';
        diskElement.id = `disk-${disk.size}`;
        diskElement.style.width = `${disk.size * 20}px`;
        diskElement.style.bottom = `${this.disks.length * 20}px`;
        diskElement.style.backgroundColor = colors[disk.size - 1];
        diskElement.style.position = 'absolute';
        diskElement.style.left = '50%';
        diskElement.style.transform = 'translateX(-50%)';
        this.element.appendChild(diskElement);
        this.disks.push(disk);
    }
    checkDiskPresent() {
        return this.disks.length > 0;
    }
    pop() {
        this.element.removeChild(this.element.lastChild);
        return this.disks.pop();
    }
}

class Disk {
    constructor(size) {
        this.size = size;
    }
}

class TowerOfHanoi {
    constructor() {
        this.sourceRod = new Rod("A", rodAElement);
        this.auxiliaryRod = new Rod("B", rodBElement);
        this.destinationRod = new Rod("C", rodCElement);
    }

    arrangeDisks(n) {
        for (let i = n; i > 0; i--) {
            this.sourceRod.push(new Disk(i));
        }
    }

    async moveDisk(sourceRod, destinationRod) {
        let disk = sourceRod.pop();
        destinationRod.push(disk);
        await this.sleep(1000);  // Delay to visualize the movement
    }

    async solve(n, sourceRod, auxiliaryRod, destinationRod) {
        if (n === 0) {
            return;
        }
        await this.solve(n - 1, sourceRod, destinationRod, auxiliaryRod);
        await this.moveDisk(sourceRod, destinationRod);
        await this.solve(n - 1, auxiliaryRod, sourceRod, destinationRod);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

function clear() {
    rodAElement.innerHTML = "";
    rodBElement.innerHTML = "";
    rodCElement.innerHTML = "";
}

function disableButtons() {
    document.getElementById("add-disk").disabled = true;
    document.getElementById("solve").disabled = true;
}

function enableButtons() {
    document.getElementById("add-disk").disabled = false;
    document.getElementById("solve").disabled = false;
}

function addListeners() {
    document.getElementById("solve").addEventListener('click', async function () {
        disableButtons();
        await towerOfHanoi.solve(input.value, towerOfHanoi.sourceRod,
            towerOfHanoi.auxiliaryRod, towerOfHanoi.destinationRod);
    });

    document.getElementById("add-disk").addEventListener('click', function () {
        let numberOfDisks = parseInt(input.value);
        if (numberOfDisks < 1 || numberOfDisks > 10 || isNaN(numberOfDisks)) {
            alert("Please enter a valid number of disks i.e between 1 to 10.");
            return;
        }
        document.getElementById("add-disk").disabled = true;
        document.getElementById("solve").disabled = false;
        setUpSimulation();
    });

    document.getElementById("reset").addEventListener('click', function () {
        clear();
        enableButtons();
    });
}

function setUpSimulation() {
    towerOfHanoi = new TowerOfHanoi();
    towerOfHanoi.arrangeDisks(input.value);
}

function init() {
    addListeners();
}

init();