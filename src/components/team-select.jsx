function SelectTeam({teams, handleSelectTeam}) {

const handleChange = (event) => {
    const selectedTeamName = event.target.value;
    const selectedTeam = teams.find((team) => team.name === selectedTeamName)
    handleSelectTeam(selectedTeam);
};
return (
    <label>
    <select onChange={handleChange}>
        <option value="" disabled selected>Select Team</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
           ))}
    </select>
    </label>
);
};

export default SelectTeam;