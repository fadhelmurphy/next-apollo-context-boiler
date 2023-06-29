import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Image from "next/image";
export default function Mobile({ onAdd = () => {}, ...props }: any) {
  const {
    href = `/anime/${props.id}`,
    bannerImage,
    coverImage: { large = "" },
    title: { english = "", romaji = "" },
    format,
    episodes,
    status,
    studios,
    genres,
    averageScore,
  } = props;
  const ActionCard = styled.div`
    height: auto;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    & p {
      font-weight: 500;
      border-radius: 5px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 35px;
      background: #1b8884;
      text-decoration: none;
      color: #fff;
      margin: 10px 0 0 0;
      box-sizing: border-box;
      cursor: pointer;
    }
  `;
  const ChildDetailContainer = css`
  h1 {
    margin: 0;
  }
  .studios {
    margin-bottom: 30px;
  }
  .romaji {
    margin: 0;
  }
  span {
    text-transform: Capitalize;
  }
    .header .img-banner {
      width: 100%;
      height: 200px;
      background: #f2f2f2;
      position: relative;
      overflow: hidden;
    }
    .header .img-banner img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .img-detail {
      padding: 20px;
      height: 200px;
    }
    .img-detail img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .description {
      padding: 20px;
    }
    .description .title {
      margin: 0;
    }
  `;
  return (
    <>
      <div className={`container ${ChildDetailContainer}`}>
        <div className="col-12">
          <div className="header">
            <div className="img-banner">
              <Image width={390} height={200} src={bannerImage} alt="banner image" />
            </div>
          </div>
          <div className="content grid">
            <div className="thumbnail col-12">
              <div className="img-detail">
                <Image width={350} height={160} src={large} alt="image detail" />
              </div>
            </div>
            <div className="description col-12">
              <span className="title">
                <h1>{english}</h1>
                <p className="romaji">{romaji}</p>
              <span className="studios">
                <h4>
                    {
                      // Checks whether anime has studios before accessing key
                      studios.nodes && studios.nodes.length >= 1
                        ? !studios.nodes[0].name
                          ? "Unknown"
                          : studios.nodes[0].name
                        : "Unknown"
                    }
                </h4>
              </span>
              </span>
              <span className="format">
                <p>
                  Format : {format}
                </p>
              </span>
              <span className="episodes">
                <p>
                  Episodes : {episodes}
                </p>
              </span>
              <span className="status">
                <p>
                  Status : {status}
                </p>
              </span>
              <span className="genres">
                <p>
                  Genre :{" "}
                  <b>
                    {
                      // Checks whether genre has true in order to display
                      genres && genres.length >= 1
                        ? genres.join(", ")
                        : "Unknown"
                    }
                  </b>
                </p>
              </span>
              <span className="rating">
                <p>
                  Rating : <b>{averageScore}%</b>
                </p>
              </span>
              <ActionCard onClick={() => onAdd(props)} className="action-card">
                <p>ADD TO COLLECTION</p>
              </ActionCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
