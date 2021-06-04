import react from 'react'


const SearchForm = ({keyword,setKeyword}) => {
    const handleSearchChange= (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
return( 
<input type= "search" placeholder= "search" value= {keyword} onChange = {handleSearchChange} className="form-control mb-4" />

)}

export default SearchForm;