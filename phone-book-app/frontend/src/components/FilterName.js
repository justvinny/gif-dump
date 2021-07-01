const FilterName = ({filterName, setFilterName}) => {
    const handleChange = (event) => {
        setFilterName(event.target.value);
    }

    return (
        <section>
            <label>Filter shown with <input placeholder="e.g. Arto" value={filterName} onChange={handleChange}></input></label>
        </section>
    )
}

export default FilterName;