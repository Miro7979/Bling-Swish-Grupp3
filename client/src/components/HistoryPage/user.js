export const user = {
  name: 'Captain Bling',
  transactions: [
    {
      date: '1990-01-01',
      amount: 199,
      fromUser: 'Ingvar Kampvik',
      toUser: ''
    },
    {
      date: '1992-02-02',
      amount: 299,
      fromUser: 'Stig Stjernfeldt',
      toUser: ''
    },
    {
      date: '1994-04-04',
      amount: 499,
      fromUser: '',
      toUser: 'Ylva Fredriksson'
    }
  ],
  children: [
    {
      name: 'Son Bling',
      transactions: [
        {
          date: '2000-01-01',
          amount: 1299,
          fromUser: '',
          toUser: 'Ulla-Britt Karlsson'
        },
        {
          date: '2002-02-02',
          amount: 2299,
          fromUser: '',
          toUser: 'Britt Nielsen'
        }
      ],
      children: [{ }]
    },
    {
      name: 'Daughter Bling',
      transactions: [
        {
          date: '3000-01-01',
          amount: 1999,
          fromUser: 'Marie Bertilsson',
          toUser: ''
        },
        {
          date: '3003-02-02',
          amount: 2999,
          fromUser: 'Annika Svensson',
          toUser: ''
        }
      ],
      children: [{ }]
    },
  ]
}

