function createData(
  name: string,
  tag: string,
  isSolved: boolean,
  isFavourite: boolean,
  id: number
) {
  return { name, tag, isSolved, isFavourite, id }
}

const data = [
  createData('A - Dry String', 'Implementation ', false, false, 1),
  createData('B - N Queens', 'dp', true, true, 2),
  createData('C - Permutation Numbers', 'Combinatorics', false, false, 3),
  createData('D - Permutation Numbers', 'Combinatorics', false, false, 4),
  createData('E - Permutation Numbers', 'Combinatorics', false, false, 5),
  createData('F - Permutation Numbers', 'Combinatorics', false, false, 6),
  createData('G - Permutation Numbers', 'Combinatorics', false, false, 7),
  createData('H - Permutation Numbers', 'Combinatorics', false, false, 8),
  createData('I - Permutation Numbers', 'Combinatorics', false, false, 9),
  createData('J - Permutation Numbers', 'Combinatorics', false, false, 10),
  createData('K - Permutation Numbers', 'Combinatorics', false, false, 11),
  createData('L - Permutation Numbers', 'Combinatorics', false, false, 12),
  createData('M - Permutation Numbers', 'Combinatorics', false, false, 13),
  createData('N - Permutation Numbers', 'Combinatorics', false, false, 14),
]

export default data
