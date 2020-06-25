abstract class Constants {

    public static readonly suits = [
        { icon: '♠', color: 'black'},
        { icon: '♥', color: 'red'},
        { icon: '♣', color: 'black'},
        { icon: '♦', color: 'red'},
    ]

    public static readonly apiName = 'CardsHttpApi'

    // active seats given number of players (clockwise from player)
    public static readonly seatConfig = [
        [], // not supported (0 players)
        [], // not supported (1 players)
        [false, false, false, true, false, false, false], // 2
        [false, false, true, false, true, false, false],  // 3
        [false, true, false, true, false, true, false],   // 4
        [false, true, true, false, true, true, false],    // 5
        [false, true, true, true, true, true, false],     // 6
        [true, true, true, false, true, true, true],      // 7
        [true, true, true, true, true, true, true],      // 8
    ]

}

export default Constants