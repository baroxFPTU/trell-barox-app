export const INITIAL_COLUMN_DATA = {
  
}

export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'Todo column',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-10', 'card-12', 'card-11', 'card-13'],
          cards: [
            {
              id: 'card-1', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 1', cover: 'https://source.unsplash.com/random'
            },
            {
              id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 2', cover: null
            },
            {
              id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 3', cover: null
            },
            {
              id: 'card-10', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 10', cover: null
            },
            {
              id: 'card-11', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 11', cover: null
            },
            {
              id: 'card-12', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 12', cover: null
            },
            {
              id: 'card-13', boardId: 'board-1', columnId: 'column-1', title: 'Do something with the card 13', cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'InProgress column',
          cardOrder: ['card-4', 'card-5', 'card-6'],
          cards: [
            {
              id: 'card-4', boardId: 'board-1', columnId: 'column-2', title: 'Do something with the card 4', cover: null
            },
            {
              id: 'card-5', boardId: 'board-1', columnId: 'column-2', title: 'Do something with the card 5', cover: null
            },
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Complete column',
          cardOrder: ['card-7', 'card-8', 'card-9'],
          cards: [
            {
              id: 'card-7', boardId: 'board-1', columnId: 'column-3', title: 'Do something with the card 1', cover: null
            },
            {
              id: 'card-8', boardId: 'board-1', columnId: 'column-3', title: 'Do something with the card 2', cover: null
            },
            {
              id: 'card-9', boardId: 'board-1', columnId: 'column-3', title: 'Do something with the card 3', cover: null
            },
          ]
        }
      ]
    }
  ]
}