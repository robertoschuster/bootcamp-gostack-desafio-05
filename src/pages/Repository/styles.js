import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${css`
    svg {
      margin-right: 10px;
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          /* background: #eee; */
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const NavGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const NavButton = styled.button.attrs((props) => ({
  disabled: props.firstPage,
}))`
  width: 120px;
  color: #fff;
  font-weight: 600;
  background: #7159c1;
  border: 0;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 4px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  select {
    color: #fff;
    font-weight: 600;
    background: #7159c1;
    border: 0;
    padding: 10px 15px;
    margin-right: 10px;
    border-radius: 4px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    &:hover {
      cursor: pointer;
    }
  }
`;
