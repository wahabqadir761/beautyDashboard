
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import Header from '../../Components/Header';
import MainHeader from '../../Components/MainHeader';
import { GetList, Post } from '../../Config/ApiHandling';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import DeleteButton from '../../Components/DeleteButton';
import Pagination from '../../Components/Pagination'
import EditButton from '../../Components/EditButton';

const PageList = () => {
    const [list, setList] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpge, setpostperpge] = useState(10);

    const navigate = useNavigate();

    let cols = [
        { name: "Title", key: "title"},
        // { name: "Description", key: "description", displayField: (item, index) => renderDescription(item.condition, index) },s
        {
            name: "Action",
            displayField: (e) => (
                <>
                    {/* <Button type="primary" onClick={() => edit(e)}>Edit</Button> */}
                    <EditButton click={() => edit(e)} />
                </>
            )
        },
    ];

    const renderDescription = (descriptionArray, index) => {
        if (!descriptionArray) {
            return null; // Add a check and handle the case where descriptionArray is undefined
        }

        const initialPoints = descriptionArray.slice(0, 2);
        const remainingPoints = descriptionArray.slice(2);

        return (
            <>
                <ol>
                    {initialPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                    {remainingPoints.length > 0 && (
                        <>
                            {expandedRows.includes(index) && (
                                <>
                                    {remainingPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </>
                            )}
                            <Button type="link" onClick={() => toggleRowExpansion(index)}>
                                {expandedRows.includes(index) ? 'Hide Points' : 'Load More'}
                            </Button>
                        </>
                    )}
                </ol>
            </>
        );
    };


    const toggleRowExpansion = (index) => {
        setExpandedRows((prevExpandedRows) =>
            prevExpandedRows.includes(index)
                ? prevExpandedRows.filter((row) => row !== index)
                : [...prevExpandedRows, index]
        );
    };

    useEffect(() => {
        Promise.all([
            GetList("privacypolicy"),
            GetList("aboutus")
        ])
            .then(([privacyPolicyRes, aboutUsRes]) => {
                // Merge data from both API calls based on a common key (e.g., _id)
                const mergedData = mergeData(privacyPolicyRes?.data?.data, aboutUsRes?.data?.data, '_id');
                setList(mergedData);
            })
            .catch((e) => console.log(e));
    }, []);


    const mergeData = (array1, array2, commonKey) => {
        const mergedArray = [];
        array1.forEach((item1) => {
            const matchingItem = array2.find((item2) => item1[commonKey] === item2[commonKey]);
            if (matchingItem) {
                mergedArray.push({ ...item1, ...matchingItem });
            } else {
                mergedArray.push(item1);
            }
        });
        array2.forEach((item2) => {
            const matchingItem = array1.find((item1) => item1[commonKey] === item2[commonKey]);
            if (!matchingItem) {
                mergedArray.push(item2);
            }
        });
        return mergedArray;
    };


    let edit = (e) => {
        navigate("/dashboard/editpage", {
            state: e
        });
    };

    const indexoflastpost = currentpage * postperpge;
    const indexofFirstpost = (currentpage - 1) * postperpge;
    const currentpost = (Array.isArray(list) && list.length > 0) && list?.slice(indexofFirstpost, Math.min(indexoflastpost, list.length));

    const paginate = (pageNumber) => {
        console.log('Before setcurrentpage:', currentpage);
        setcurrentpage(pageNumber);
        console.log('After setcurrentpage:', currentpage);
    };

    return (
        <div>
            <MainHeader />
            <Header screenTitle="Pages List " />
            <Box>
                <Box className="px-5">
                    <ToastContainer />
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {list ? (
                        list.length === 0 ? (
                            <table
                                className="table table-striped table-bordered text-center"
                                style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
                            >
                                {/* ... (table structure) */}
                            </table>
                        ) : (
                            <table
                                className="table table-striped table-bordered text-center"
                                style={{ width: '90%', margin: '1%', border: '1px solid #ccc' }}
                            >
                                <thead>
                                    <tr>
                                        {cols &&
                                            cols.map((x, i) => {
                                                return <th style={{ backgroundColor: "#212529", color: "#fff" }} key={i}>{x.name}</th>;
                                            })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentpost.map((item, key) => (
                                        <tr key={key} >
                                            {cols.map((x, i) => (
                                                <>
                                                    {x.key == "condition" ?

                                                        <td style={{ maxWidth: "250px", verticalAlign: "middle" }} key={i}>{x.displayField ? x.displayField(item, key) : item[x.key]} </td>
                                                        :
                                                        <td style={{ maxWidth: "200px", verticalAlign: "middle" }} key={i}>{x.displayField ? x.displayField(item, key) : item[x.key]}</td>
                                                    }
                                                </>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    ) : null}
                </div>
            </Box>
            <Pagination perpge={postperpge} total={list.length} paginate={paginate} />

        </div>
    );
};

export default PageList;
