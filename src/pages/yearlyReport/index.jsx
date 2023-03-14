import React, {useState, useEffect} from 'react';
import { Ellipsis,List } from 'antd-mobile';
import s from './index.module.scss';
import IndexApi from '@/api/index'

const YearlyReport = ()=>{
    const [dailyList,setDailyList] = useState([])
    useEffect(()=>{
        IndexApi.getYearlyList().then((res)=>{
            const {code,data} = res;
            if(code==0&&data){
                setDailyList(data)
            }
        })
    },[])
    return (
        <div className={s.page}>
            <List header='年报'>
            {dailyList.map((item)=>{
                return <List.Item key={item.id}>
                    <div>{`${item.create_at}          ${item.report[0].type}`}</div>
                <Ellipsis
                  direction='end'
                  content={item.report[0].content}
                  expandText='展开'
                  collapseText='收起'
                />
              </List.Item>
            })}
            </List>   
        </div>
    )
}
export default YearlyReport
