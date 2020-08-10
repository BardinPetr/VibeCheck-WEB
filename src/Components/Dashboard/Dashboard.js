import React, {useState} from 'react';
import MaterialTable from "material-table";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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


const useStyles = makeStyles((theme) => ({
    imgPreview: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    }
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
                                    if (d.isLoading) return;
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
                                            },
                                            {
                                                title: 'Image',
                                                field: 'imageUrl',
                                                render: i => <Avatar variant="rounded"
                                                                     src={i.imageUrl}
                                                                     className={styles.imgPreview}/>,
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
                                            },
                                            {
                                                title: 'Recommended',
                                                field: 'recommended',
                                                type: 'boolean'
                                            },
                                            {
                                                title: 'Min Price',
                                                field: 'minPrice',
                                                type: 'numeric'
                                            },
                                            {
                                                title: 'Max Price',
                                                field: 'maxPrice',
                                                type: 'numeric'
                                            },
                                            {
                                                title: 'Location',
                                                field: 'location',
                                                render: i => <Typography
                                                    variant="body2">{`${i.location.oa}/${i.location.ha}`}</Typography>,
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
                                            },
                                            {
                                                title: 'Google Maps Url',
                                                field: 'googlemapsUrl',
                                                render: i => <CollapsibleLink data={i.googlemapsUrl}
                                                                              collapse={i.tableData.id !== selectedRow}/>,
                                            },
                                        ]}
                                        data={d.value}
                                        title="Places"
                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    console.log(newData)
                                                    resolve();
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    // const dataUpdate = [...data];
                                                    // const index = oldData.tableData.id;
                                                    // dataUpdate[index] = newData;
                                                    console.log(newData)
                                                    resolve();
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise((resolve, reject) => {
                                                    // const dataDelete = [...data];
                                                    // const index = oldData.tableData.id;
                                                    // dataDelete.splice(index, 1);
                                                    // setData([...dataDelete]);
                                                    console.log(oldData)

                                                    resolve();
                                                })
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
                                            }),
                                            addRowPosition: 'first'
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
