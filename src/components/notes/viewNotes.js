import React, { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL } from "../constant";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ViewNote = ({ props, data }) => {

  const [viewData, setViewData] = useState([])
  const { items, requestSort, sortConfig } = useSortableData(viewData);

  useEffect(() => {
    setViewData(data)
  }, [data])

  const deleteDate = async (id) => {
    const { data } = await axios.put(`${API_URL}/Notes/delete/${id}`)
    setViewData(data)
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">
              <button type="button" onClick={() => requestSort('Title')} className='btn'>Title</button>
            </th>
            <th scope="col">
              <button type="button" onClick={() => requestSort('Content')} className='btn'>Content</button>
            </th>
            <th scope="col">
              <button type="button" onClick={() => requestSort('created')} className='btn'>Date</button>
            </th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {items.length > 0 ?
          <tbody>
            {items.map((item, i) => {
              const date2 = new Date(item.created)
              const date = date2.toLocaleString()
              return (
                <tr key={item._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.Title}</td>
                  <td>{item.Content}</td>
                  <td>{date}</td>
                  <td><button type="button" className="btn btn-outline-danger" onClick={() => deleteDate(item._id)}>X</button></td>
                </tr>
              )
            })}
          </tbody> : <tbody></tbody>}
      </table>
    </div>
  );
}

export default ViewNote;