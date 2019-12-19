//Build Dynamic Table - From any WebApi or Local Json File Using AXIOS Methods


import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

export interface IState {
    apiurl: string;
    datarecords: any[];
    datacolumns: any[];
}

class BuildDynamicTable extends React.Component<RouteComponentProps<any>, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { 
             datarecords: [], 
             datacolumns: [],
        }
    }
    
    public componentWillMount(): void {
        const api_url = "http://dummy.restapiexample.com/api/v1/employees";
        axios.get(api_url).then(response => {
         this.setState({datarecords: response.data});
          this.extractKeys();
         
        })
    }

    private extractKeys() 
    { 
        const firstrecord = _.keys(this.state.datarecords[0]);
        this.setState({datacolumns: firstrecord,});
    }

    private displayRecords(key: number) {
    	const datacolumns= this.state.datacolumns;
   
    	return datacolumns.map((each_col) => 
    		this.displayRecordName(each_col,key)
    	) 
    }

    private displayRecordName(colname:string, key:number){
    	const record = this.state.datarecords[key];
    	return <th>{record[colname]}</th> 
    }

    private Capitalize(str: string){
        const str_t = str.toUpperCase();
        const str_tt = str_t.replace("_", " ");
        return str_tt;
    }

    public render() {
        const datarecords = this.state.datarecords;
        const each_datarecord_keys = this.state.datacolumns;
        return (
            <div>
                {datarecords.length === 0 && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                             <tr>
                             {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key => 
                            <th scope="col">{this.Capitalize(each_datarecord_key)}</th>
                                )}
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>                            
                            <tbody> 
                            {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                <tr key={each_datarecord.id}>
                                {this.displayRecords(recordindex)}
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuildDynamicTable;