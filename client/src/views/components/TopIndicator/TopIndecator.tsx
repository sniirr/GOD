import { FC } from 'react';
import {Link, useRouteMatch} from 'react-router-dom';


export interface TopIndecatorProps {
    pages:Array<string>;
    path:string;
}





const TopIndecator: FC<TopIndecatorProps> = (props:TopIndecatorProps) => {
    const { pages, path } = props;

 
    return (
        <div className="indicator">
            <hr></hr>
            {pages.map((page, i)=>{
                return(<Link key={i} to={`${path}/${page}`}><div>{i+1}</div></Link>);
            })}
            
        </div>
    );
};

export default TopIndecator;
