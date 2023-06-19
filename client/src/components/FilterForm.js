const FilterForm = ({value, handleFilterChange}) => {
    return (
        <div>
            Filter shown with<br/><input value = {value} onChange = {handleFilterChange}/>
        </div>
    )
}

export default FilterForm