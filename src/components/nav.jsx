import SelectTeam from "./team-select";

function Nav({teams, handleSelectTeam, getRandomTen, checkOrder, 
              allGuessesMade, setOrder}){

    return (
<nav>
        <SelectTeam teams={teams} handleSelectTeam={handleSelectTeam} />
        <button onClick={getRandomTen}>Get New List</button>
        <button onClick={() => {setOrder(Array(10).fill(null))}}>Clear</button>
        <button onClick={checkOrder}
                disabled={!allGuessesMade}
                  style={{alignContent: 'center'}}>
            Check Order</button>
      </nav>
    )
};

export default Nav;