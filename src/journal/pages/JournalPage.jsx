
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"


export const JournalPage = () => {

    const dispatch = useDispatch();

    const { isSaving, active } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }
    return (
        <JournalLayout>

        {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vitae id aut laudantium ex ipsam sit dignissimos numquam repudiandae quos doloremque eius nulla obcaecati, reiciendis mollitia ut voluptas tempore illum?</Typography> */}
        
        {
            (!!active)
            ? <NoteView />
            : <NothingSelectedView />
        }
        {/* <NothingSelectedView /> */}
        {/* <NoteView /> */}

        <IconButton
            disabled={isSaving}
            onClick={onClickNewNote}
            size="large"
            sx={{
            color:'white',
            backgroundColor: 'error.main',
            ':hover' : {backgroundColor: 'error.main', opacity: 0.9},
            position : 'fixed',
            right: 50,
            bottom: 50
            }}
        >
            <AddOutlined sx={{fontSize: 30}}/>

        </IconButton>

        </JournalLayout>
    )
}
