const GAMETYPES = [
  {
    name: 'Catan',
    numOfGames: 12,
  },
  {
    name: 'Poker',
    numOfGames: 69,
  },
  {
    name: 'Big 2',
    numOfGames: 420,
  },
];

const MEMBERS = [
  {
    name: 'Paul Chiang',
    abrv: 'PC',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'Jon Yuen',
    abrv: 'JY',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'Brian Sun',
    abrv: 'BS',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'Brian Ho',
    abrv: 'BH',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'Sawyer Xie',
    abrv: 'SX',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'Michael Tang',
    abrv: 'MT',
    winnings: 0,
    buyIns: 0,
  },
  {
    name: 'G J',
    abrv: 'GJ',
    winnings: 0,
    buyIns: 0,
  },
];

const POKER = {
  name: 'Poker',
  activeMembers: MEMBERS,
  games: [
    {
      date: '10/12/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 600,
      winner: {
        name: 'Sawyer Xie',
        abrv: 'SX',
      },
    },
    {
      date: '10/23/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Paul Chiang',
          abrv: 'PC',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
      ],
      pot: 500,
      winner: {
        name: 'Brian Sun',
        abrv: 'BS',
      },
    },
    {
      date: '10/09/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Paul Chiang',
          abrv: 'PC',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Paul Chiang',
        abrv: 'PC',
      },
    },
    {
      date: '10/11/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/10/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/07/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/06/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/05/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/04/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/03/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/02/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
    {
      date: '10/01/2019',
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      pot: 400,
      winner: {
        name: 'Brian Ho',
        abrv: 'BH',
      },
    },
  ],
};

const BIGTWO = {
  history: [
    {
      players: [
        {
          name: 'Sawyer Xie',
          abrv: 'SX',
        },
        {
          name: 'Brian Ho',
          abrv: 'BH',
        },
        {
          name: 'Brian Sun',
          abrv: 'BS',
        },
        {
          name: 'Jon Yuen',
          abrv: 'JY',
        },
      ],
      date: '10/21/2019',
      rounds: [
        [
          [-5, 20, -3, -12],
          [-5, -12, 22, -5],
          [59, -33, -12, -14],
          [-27, -3, -12, 42],
        ],
        [
          [-16, -27, 45, -2],
          [87, -27, -27, -33],
          [-5, -3, -27, 35],
          [97, -33, -16, -48],
        ],
      ],
      roundSums: [[22, -28, -5, 11], [163, -90, -25, -48]],
      totalRounds: 2,
    },
  ],
  totalGames: 1,
  totalRounds: 2,
  pot: 90 + 28 + 5 + 25 + 48,
};

const ROOMDETAILS = {
  gameTypes: GAMETYPES,
  members: MEMBERS,
  poker: POKER,
  bigTwo: BIGTWO,
};

export default ROOMDETAILS;
