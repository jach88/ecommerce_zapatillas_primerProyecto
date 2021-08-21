export default function Loading() {
    //modificando estilo del spinner
    return (
        <div style={{
            position:'relative',
            top:'0',
            left:'0',
            width:'100vw',
            height:'100vw',
            zIndex:99,
            backgroundColor:'white'
        }}>
            <i className="fas fa-shoe-prints fa-spin fa-7x"
                style={{
                    color:'navy',
                    position:'absolute',
                    top:'calc(20% - 100px',
                    left:'calc(50% - 50px'
                }}
            />
        </div>
    )
}
