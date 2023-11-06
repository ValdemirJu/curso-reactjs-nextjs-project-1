import './styles.css'

export const TextInput = ({ searchValue, handleSearchChange }) => {
  return (
    <input
      className='text-input'
      type='search'
      onChange={handleSearchChange}
      value={searchValue}
      placeholder='Search'
    />
  )
}
