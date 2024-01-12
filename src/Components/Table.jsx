import React, { useEffect, useState } from 'react';

import { Skeleton } from "antd";
import dayjs from 'dayjs';

const Table = (props) => {
  let { data, flag, cols } = props;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {data ? (
          data.length === 0 ? (
            flag ? (
              <table
                className="table table-striped table-bordered text-center"
                style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
              >
                <thead>
                  <tr>
                    {cols &&
                      cols.map((x, i) => {
                        return <th className='tablehead' key={i}>{x.name}</th>;
                      })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6">No Data</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table
                className="table table-striped table-bordered text-center"
                style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
              >
                <tr>
                  {cols &&
                    cols.map((x, i) => {
                      return <th style={{ backgroundColor: "#212529", color: "#fff" }} key={i}>{x.name}</th>;
                    })}
                </tr>
                <tbody>
                  {cols.map((x, i) => (
                    <tr key={i}>
                      <td key={i} colSpan="6"><Skeleton.Input style={{ width: '90vh' }} active animation="wave" /> </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            )
          ) : (
            <table
              className="table table-striped table-bordered text-center"
              style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
            >
              <thead>
                <tr>
                  {cols &&
                    cols.map((x, i) => {
                      return <th className='tablehead' style={{ backgroundColor: "#212529", color: "#fff", fontSize: "20px" }} key={i}>{x.name}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, key) => (
                  <tr key={key} className='table_img tablerow'>
                    {cols.map((column, i) => (
                      < td style={{ verticalAlign: 'middle' }} key={i}>
                        {column.displayFeild ? (column.displayFeild(item)) : column.img ? (
                          <img
                            className='table_img'
                            src={`${item[column.img]}`}
                            alt="NoImage"
                            style={{ width: '60px', height: '55px' }}
                          />
                        ) : (
                          // Check if the key is "amount" or "price" and prepend the dollar sign
                          (column.key === 'amount' || column.key === 'price') ? `$${item[column.key]}` : column.key == "paymentPurchaseDate" ? dayjs(item[column.key]).format('D-MMM-YYYY') : item[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : null}
      </div >
    </>

  );
};

export default Table;
