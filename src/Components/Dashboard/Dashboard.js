import React, {forwardRef, useState} from 'react';
import MaterialTable, {MTableEditRow} from "material-table";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {FirestoreCollection} from "@react-firebase/firestore";
import ChipList from "../Modules/ChipList";
import MainLayout from "../../Layouts/MainLayout";
import CollapsibleText from "../Modules/CollapsibleText";
import CollapsibleLink from "../Modules/CollapsibleLink";
import GPSEdit from "../Modules/GPSEdit";
import ChipListSelect from "../Modules/ChipListSelect";
import LargeTextEdit from "../Modules/LargeTextEdit";
import SmallTextEdit from "../Modules/SmallTextEdit";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const textLimit = 50;

const useStyles = makeStyles((theme) => ({
    imgPreview: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));


const Dashboard = props => {
    const [selectedRow, setSelectedRow] = useState(null);

    const styles = useStyles()

    return (
        <div>
            <MainLayout>
                <FirestoreCollection path="/places/" limit={6}>
                    {d => {
                        console.log(d.value)
                        return (
                            <div>
                                <Backdrop open={d.isLoading}>
                                    <CircularProgress color="inherit"/>
                                </Backdrop>
                                {(() => {
                                    if (d.isLoading) return ;
                                    const goalTags = [...new Set(d.value.flatMap(i => i.goals))];
                                    const moodTags = [...new Set(d.value.flatMap(i => i.moods))];

                                    return <MaterialTable
                                            columns={[
                                                {
                                                    title: 'ID',
                                                    field: 'tableData',
                                                    editable: 'never',
                                                    render: i => <Typography
                                                        variant="body1">{i.tableData.id}</Typography>
                                                },
                                                {
                                                    title: 'Name',
                                                    field: 'name',
                                                    editComponent: props => <SmallTextEdit {...props}/>
                                                },
                                                {
                                                    title: 'Image',
                                                    field: 'imageUrl',
                                                    render: i => <Avatar variant="rounded"
                                                                         src={i.imageUrl}
                                                                         className={styles.imgPreview}/>,
                                                    editComponent: props => <SmallTextEdit {...props}/>
                                                },
                                                {
                                                    title: 'Description',
                                                    field: 'description',
                                                    render: i => <CollapsibleText data={i.description}
                                                                                  collapse={i.tableData.id !== selectedRow}
                                                                                  limit={50}/>,
                                                    editComponent: props => <LargeTextEdit {...props}/>
                                                },
                                                {
                                                    title: 'District',
                                                    field: 'district',
                                                    editComponent: props => <SmallTextEdit {...props}/>
                                                },
                                                {
                                                    title: 'Recommended',
                                                    field: 'recommended',
                                                    type: 'boolean'
                                                },
                                                {
                                                    title: 'Min Price',
                                                    field: 'minPrice',
                                                    editComponent: props => <SmallTextEdit {...props} numeric/>
                                                },
                                                {
                                                    title: 'Max Price',
                                                    field: 'maxPrice',
                                                    editComponent: props => <SmallTextEdit {...props} numeric/>
                                                },
                                                {
                                                    title: 'Location',
                                                    field: 'location',
                                                    render: i => <h6>{`${i.location.oa},${i.location.ha}`}</h6>,
                                                    editComponent: props => <GPSEdit {...props}/>
                                                },
                                                {
                                                    title: 'Goals',
                                                    field: 'goals',
                                                    render: i => <ChipList data={i.goals} chipColor="secondary"/>,
                                                    editComponent: props => <ChipListSelect {...props}
                                                                                            tagList={goalTags}
                                                                                            label="Goals"/>
                                                },
                                                {
                                                    title: 'Moods',
                                                    field: 'moods',
                                                    render: i => <ChipList data={i.moods}/>,
                                                    editComponent: props => <ChipListSelect {...props}
                                                                                            tagList={moodTags}
                                                                                            label="Moods"/>
                                                },
                                                {
                                                    title: 'Yandex Maps Url',
                                                    field: 'yandexmapsUrl',
                                                    render: i => <CollapsibleLink data={i.yandexmapsUrl}
                                                                                  collapse={i.tableData.id !== selectedRow}/>,
                                                    editComponent: props => <SmallTextEdit {...props}/>
                                                },
                                                {
                                                    title: 'Google Maps Url',
                                                    field: 'googlemapsUrl',
                                                    render: i => <CollapsibleLink data={i.googlemapsUrl}
                                                                                  collapse={i.tableData.id !== selectedRow}/>,
                                                    editComponent: props => <SmallTextEdit {...props}/>
                                                },
                                            ]}
                                            data={d.value}
                                            title="Places"
                                            icons={tableIcons}
                                            editable={{
                                                onRowAdd: newData =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(() => {
                                                            console.log(newData)
                                                            resolve();
                                                        }, 1000)
                                                    }),
                                                onRowUpdate: (newData, oldData) =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(() => {
                                                            // const dataUpdate = [...data];
                                                            // const index = oldData.tableData.id;
                                                            // dataUpdate[index] = newData;
                                                            console.log(newData, oldData)
                                                            resolve();
                                                        }, 1000)
                                                    }),
                                                onRowDelete: oldData =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(() => {
                                                            // const dataDelete = [...data];
                                                            // const index = oldData.tableData.id;
                                                            // dataDelete.splice(index, 1);
                                                            // setData([...dataDelete]);
                                                            console.log(oldData)

                                                            resolve();
                                                        }, 1000)
                                                    }),
                                            }}
                                            onRowClick={
                                                ((evt, newSelectedRow) =>
                                                    setSelectedRow(selectedRow === newSelectedRow.tableData.id ?
                                                        null : newSelectedRow.tableData.id))
                                            }
                                            options={{
                                                fixedColumns: {
                                                    left: 0,
                                                    right: 0
                                                },
                                                rowStyle: rowData => ({
                                                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                                                })
                                            }}
                                    />;
                                })()}
                            </div>
                        );
                    }}
                </FirestoreCollection>
            </MainLayout>
        </div>
    );
}

export default Dashboard;
