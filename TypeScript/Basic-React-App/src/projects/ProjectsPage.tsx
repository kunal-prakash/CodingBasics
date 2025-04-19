// import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import { useProjects } from "./projectHooks";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPlaceholderData: isPreviousData,
  } = useProjects();

  return (
    <>
      <h1>Projects</h1>
      {data ? (
        <>
          {isFetching && !isPending && (
            <span className="toast">Refreshing...</span>
          )}
          <ProjectList projects={data} />
          <PaginationButton
            page={page}
            setPage={setPage}
            isPreviousData={isPreviousData}
            data={data}
          />
        </>
      ) : isPending ? (
        <Loader />
      ) : isError && error instanceof Error ? (
        <ErrorBox errorMsg={error.message} />
      ) : null}
    </>
  );
};

const Loader = () => {
  return (
    <div className="center-page">
      <span className="spinner primary"></span>
      <p>Loading...</p>
    </div>
  );
};

interface ErrorBoxProps {
  errorMsg: String;
}

const ErrorBox = ({ errorMsg }: ErrorBoxProps) => {
  return (
    <div className="row">
      <div className="card large error">
        <section>
          <p>
            <span className="icon-alert inverse"></span>
            {errorMsg}
          </p>
        </section>
      </div>
    </div>
  );
};

interface PaginationButtonProps {
  page: number;
  setPage: (pageNo: number | ((oldPage: number) => number)) => void;
  isPreviousData: boolean;
  data: Project[];
}

const PaginationButton = ({
  page,
  setPage,
  isPreviousData,
  data,
}: PaginationButtonProps) => {
  return (
    <div className="row">
      <div className="col-sm-4">Current page: {page + 1}</div>
      <div className="col-sm-4">
        <div className="button-group right">
          <button
            className="button "
            onClick={() => setPage((oldPage) => oldPage - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="button"
            onClick={() => {
              if (!isPreviousData) {
                setPage((oldPage) => oldPage + 1);
              }
            }}
            disabled={data.length != 10}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
