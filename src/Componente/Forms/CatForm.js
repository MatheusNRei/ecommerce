import react from 'react'


const CatForm = ( {handleSubmit, name, setName} ) => (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Name</label>
        <input type = "text" className = "form-control" onChange = {e => setName(e.target.value)} value= {name} autoFocus required/>
        <button className="btn btn-outline-primary">Salvar</button>
        </div>
        </form>
        )

        export default CatForm;