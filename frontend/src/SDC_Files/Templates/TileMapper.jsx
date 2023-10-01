
const TileMapper = ({data, handleChange, selected}) => {
  return (
    <div className="flex flex-col mt-0 pt-0">
      {data.map((name) => (
        <div
          key={name.id}
          className="mb-2 p-2 bg-gray-800 rounded-md shadow-xl transition-transform transform hover:scale-105"
        >
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500"
              value={name.name}
              onChange={handleChange}
              checked={selected.includes(name.name)}
            />
            <span className="ml-5 font-bold text-white">{name.name}</span>
            <span className="ml-5 mt-0 text-blue-400">Dean - {name.deanname}</span>
            <span className="ml-5 mt-0 text-blue-400">Email - {name.email}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default TileMapper