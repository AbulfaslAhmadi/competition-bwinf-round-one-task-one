function arukone(n) {
    // Arukone muss >= 4 sein
    if(n < 4) {
        return console.log("Arukone muss >= 4 sein... Veränderen Sie ihre eingabe")
    }

    // Grid erstellen
    let grid = []
    for(let i=0; i<n; i++) {
        let row = []
        for(let i=0; i<n; i++) {
            row.push(0)
        }
        grid.push(row)
    }
    
    // Zahlenpaare rechnen
    let solutions = Math.floor(n/2)
    
    // Positionen der Zahlen speichern
    let pos = {}
    
    function one(i) {
        let y = Math.floor(Math.random() * n)
        let x = Math.floor(Math.random() * n)
        if(grid[y][x] !== 0) { // Generierte Zahl darf nichts anderes als freie Felder überschreiben
            return one(i);
        }
        pos[i] = {}
        pos[i][0] = y
        pos[i][1] = x
        grid[y][x] = i
        return two(i);
    }
    
    function two(i) {
        let y = Math.floor(Math.random() * n)
        let x = Math.floor(Math.random() * n)
        if(grid[y][x] !== 0) { // Generierte Zahl darf nichts anderes als freie Felder überschreiben
            two(i);
            return
        }
        pos[i][2] = y
        pos[i][3] = x
        grid[y][x] = i
        return possible(i)
    }
    
    function possible(i) {
        // Koordinaten Punkt a
        let y = pos[i][0]
        let x = pos[i][1]

        // Koordinaten Punkt b
        let Y = pos[i][2]
        let X = pos[i][3]

        grid[y][x] = 1
        grid[Y][X] = 0

        let check = [[y, x, 2]]
        while (check.length > 0) {
            let toDelete = check.length
            for(j of check) {
                if((j[1]+1) < n) {
                    if(grid[j[0]][j[1]+1] === 0) { // rechts
                        grid[j[0]][j[1]+1] = j[2]
                        check.push([j[0], j[1]+1, j[2]+1])
                    }
                }
                if((j[1]-1) >= 0) {
                    if(grid[j[0]][j[1]-1] === 0) { // links
                        grid[j[0]][j[1]-1] = j[2]
                        check.push([j[0], j[1]-1, j[2]+1])
                    }
                }
                if((j[0]+1) < n) {
                    if(grid[j[0]+1][j[1]] === 0) { // unten
                        grid[j[0]+1][j[1]] = j[2]
                        check.push([j[0]+1, j[1], j[2]+1])
                    }
                }
                if((j[0]-1) >= 0) {
                    if(grid[j[0]-1][j[1]] === 0) { // oben
                        grid[j[0]-1][j[1]] = j[2]
                        check.push([j[0]-1, j[1], j[2]+1])
                    }
                }
            }
            check.splice(0, toDelete)
        }

        let temp = grid[Y][X]
        if(temp === 0) {
            one(i)
        }
        let protection = true
        while (temp > 1) {
            if((X+1) < n) {
                if(grid[Y][X+1] === temp-1) {
                    grid[Y][X+1] = i
                    X++
                    temp--
                    protection = false
                }
            }
            if((X-1) >= 0) {
                if(grid[Y][X-1] === temp-1) {
                    grid[Y][X-1] = i
                    X--
                    temp--
                    protection = false
                }
            }
            if((Y+1) < n) {
                if(grid[Y+1][X] === temp-1) {
                    grid[Y+1][X] = i
                    Y++
                    temp--
                    protection = false
                }
            }
            if((Y-1) >= 0) {
                if(grid[Y-1][X] === temp-1) {
                    grid[Y-1][X] = i
                    Y--
                    temp--
                    protection = false
                }
            }
            if(protection) {
                return one(i)
            }
            protection = true
        }

        grid[pos[i][0]][pos[i][1]] = i
        grid[pos[i][2]][pos[i][3]] = i

        // cleaning
        for(i in grid) {
            for(j in grid[i]) {
                if(typeof(grid[i][j]) === "number") {
                    grid[i][j] = 0
                }
            }
        }
    }
    
    // Für jedes Zahlenpaar werden die Zahlen im grid hinzugefügt und überprüft, ob sie sich verknüpfen lassen
    for(let i=1; i<=solutions; i++) {
        one(`${i}`)
    }  
    
    // Erstellen des finalen Rätsels
    let result = []
    for(let i=0; i<n; i++) {
        let row = []
        for(let i=0; i<n; i++) {
            row.push(0)
        }
        result.push(row)
    }

    for(let i=1; i<=solutions; i++) {
        result[pos[i][0]][pos[i][1]] = i
        result[pos[i][2]][pos[i][3]] = i
    }
    
    // Ausgabe der Lösungen:
    console.log("Lösung:")
    for(i of grid) {
        console.log(i.join(" "))
    }

    // Ausgabe des Rätsels
    console.log(`\n\n\nRätsel\n${n}\n${solutions}`)
    for(i of result) {
        console.log(i.join(" "))
    }
}

arukone(15)