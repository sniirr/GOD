import { FC } from 'react';
import {Link, useRouteMatch} from 'react-router-dom';


export interface TopIndecatorProps {
    pages:Array<string>;
    path:string;
}





const TopIndecator: FC<TopIndecatorProps> = (props:TopIndecatorProps) => {
    const { pages, path } = props;
    let { url } = useRouteMatch();
    let urlSplit = url.split('/');
    let pageFromUrl = urlSplit[urlSplit.length-1];
 console.log(pageFromUrl);
 
    return (
        <div className="indicator">
            <hr></hr>
            {pages.map((page, i)=>{
                console.log(page===pageFromUrl)
                return(<Link key={i} to={`${path}/${page}`}><div className={page===pageFromUrl ?'indicator--current':undefined}>{i+1}</div></Link>);
            })}
            
        </div>
    );
};

export default TopIndecator;
