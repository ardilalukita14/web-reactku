import React from "react";

const Post = (props) => {
    return (
            <tr>
                <td>{props.nim}</td>
                <td>{props.nama}</td>
                <td>{props.alamat}</td>
                <td>{props.hp}</td>
                <td>{props.angkatan}</td>
                <td>{props.status}</td>
                <td>
                <button className="btn btn-sm btn-warning" onClick={() => props.hapusDataMahasiswa(props.idMahasiswa)}>Hapus</button>
                </td>
                </tr>
              
          
    )
}

export default Post;