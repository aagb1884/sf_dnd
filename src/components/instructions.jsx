function Instructions() {

    return (
        <div className="instructions-container">
            <h3 style={{ textAlign: 'center' }}>How to Play</h3>
            <ul className="instructions">
                <li>Select a team.</li>
                <li>You will be given the names of ten players.</li>
                <li>Drag the player names into the boxes on the right in the order of most goals scored, highest at the top, lowest at the bottom.</li>
                <li>Once you've made all your guesses, press 'Check Order' to see if you're right.</li>
                <li>Press 'Get New List' to get a different list/order of players, or select a different team to try again.</li>
            </ul>
        </div>
    )
};

export default Instructions;