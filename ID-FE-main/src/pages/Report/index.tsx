import React, { useEffect, ReactNode, useState } from 'react'
import {Grid, Backdrop, CircularProgress} from 'components'
import {useStyles} from './styles';
import {useDispatch, useSelector} from 'store'
import TableCell from '@material-ui/core/TableCell';
import {format} from 'date-fns';
import { getFiles } from 'store/user/actions';
import EnhancedTable from 'components/Table';
import PaperCard from 'components/PaperCard';
import { LineChart } from 'components/LineChart';
import { BarChart } from 'components/BarChart';
import { PieChart } from 'components/PieChart';
import { DoughnutChart } from 'components/DoughnutChart';
import { ScatterCharts } from 'components/ScatterChart';
import { TreemapChart } from 'components/TreemapChart';
import { LineCharts } from 'components/LineCharts';

export interface Column {
  id: 'filename' | 'size' | 'format' | 'uploadedOn' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  render?: (item: any, record: any, column: Column) => ReactNode;
}

const columns: Column[] = [
  { id: 'filename', label: 'Name', minWidth: 150 },
  { id: 'format', label: 'Format', minWidth: 150 },
  { id: 'size', label: 'File Size', minWidth: 150 },
  {
    id: 'uploadedOn',
    label: 'Uploaded At',
    minWidth: 150,
    align: 'left',
    render: (item, record, column) => (
      <TableCell key={record.id} align={column.align} role="checkbox">
        <span>{format(new Date(item), 'dd/MM/yyyy hh:mm:ss')}</span>
      </TableCell>
    )
  }
];

const Report: React.FC = () => { 
  const classes = useStyles();
  const {loading, files} = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFiles());
    }
  }, [dispatch, token]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6} >
          <PaperCard title="Number of Accounts by Current Balance Bucket" className={classes.chartArea}>
            <LineChart />
          </PaperCard>
        </Grid>
        <Grid item xs={12} md={12} lg={6} >
          <PaperCard title="Number of Accounts by Transactions per Month Bucket" className={classes.chartArea}>
            <BarChart />
          </PaperCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6} >
          <PaperCard title="sum of amount by Merchant where Category = Peer-to-Peer" className={classes.chartArea}>
            <PieChart />
          </PaperCard>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <PaperCard title="Top 10 Categories" className={classes.chartArea}>
            <DoughnutChart />
          </PaperCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6} >
          <PaperCard title="sum of amount by Date" className={classes.chartArea}>
            <ScatterCharts />
          </PaperCard>
        </Grid>
        <Grid item xs={12} md={12} lg={6} >
          <PaperCard title="sum of amount by top 10 Merchant" className={classes.chartArea}>
            <TreemapChart />
          </PaperCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} >
          <PaperCard title="Line Chart" className={classes.chartArea}>
            <LineCharts />
          </PaperCard>
        </Grid>
      </Grid>
      <EnhancedTable title="Uploaded Files" columns={columns} rows={files || []} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        Updating...
      </Backdrop>
    </>
  )
}

export default Report;
