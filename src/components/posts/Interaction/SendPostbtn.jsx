import Link from "next/link"
import styled from "styled-components"

export default function SendPostButton({nick_name}){

    return (
            <StyledWrapper>
              <p className="Introduce">{nick_name} 강사님이시네요! 새로운 PT 강의를 등록해보세요!</p>
            <Link href="/newpost">
              <button className="btn-newpost">
                <div className="Add">강사등록</div>
              </button>
            </Link>
            </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .Introduce{
        font-family: sans-serif;
    }
    .btn-newpost{
        margin-left: 50px;
        cursor: pointer;
        width: 70px;
        height: 35px;
        border: 0;
        background-color: #F26E22;
        border-radius: 10px;
        .Add{
            color: #FFF;
        }
    }
`;