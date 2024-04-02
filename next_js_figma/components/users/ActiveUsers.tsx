import { useMemo } from "react";
import { generateRandomName } from "../../lib/utils";
import { useOthers, useSelf } from "../../liveblocks.config";
import { Avatar } from "./Avatar";
import styles from "./Avatar.module.css"

const ActiveUsers =  ()=> {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > 3;

    const memorizedUsers = useMemo(()=>{

  return(
    <main className="flex  justify-center items-center py-2 gap-1 ">
    <div className="flex pl-3">
    {currentUser && (
          <Avatar  name="You" otherStyles="border-[3px] border-primary-green" />
      )}
      {users.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId}  name={generateRandomName()} otherStyles="-ml-3" />
        );
      })}

      {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

   
    </div>
  </main> 
  )  
        
    },[users.length])
  
    return memorizedUsers;
  }

  export default ActiveUsers;