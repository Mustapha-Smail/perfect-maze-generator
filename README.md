# perfect-maze-generator

<h2>If you want to test it, head over here: </h2> 
<a href="https://infinite-beach-05448.herokuapp.com/" target="_blank">https://infinite-beach-05448.herokuapp.com/</a>

<h3> A better version where you can decide of the Cols and Rows of the maze is right below: </h3>
 <a href="https://young-scrubland-05043.herokuapp.com/" target="_blank">https://young-scrubland-05043.herokuapp.com/</a>

<div>
  <h2>The algorithm to generate the maze is in the file public/maze.js</h2>
</div>

<div>
  <h3>The maze is generated using the iterative implementation. it is described with this following routine : </h3>
    <ul>
      <li> Choose the initial cell, mark it as visited and push it to the stack </li>
      <li> While the stack is not empty
          <ul>
            <li>Pop a cell from the stack and make it a current cell
            <li>If the current cell has any neighbours which have not been visited
              <ul>
                <li>Push the current cell to the stack
                <li>Choose one of the unvisited neighbours
                <li>Remove the wall between the current cell and the chosen cell
                <li>Mark the chosen cell as visited and push it to the stack
              </ul>
        </ul>
    </ul>
 </div>

<div>
  <h3>We first create a blankMaze ( a table with "tr" and "td" ).
  Then we draw the perfect maze using the algorithm (draw)</h3> 
</div>
<div>
  <h3>Each cell is an object. its main methods are : </h3>
  <ul>
    <li><strong>show</strong> : it manages the borders of the cell to display 
    <li><strong>checkNeighbors</strong> : it checks whether a cell has neighbors or not.<br>
      if it has, it picks up a random cell to visit, otherwise, it returns undefined.</li>
  </ul>
</div>
    
