import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import createApiClient from "../../api/api-client-factory";
import useApp from "../../hooks/useApp";
import useProject from "../../hooks/useProject";
import { Project } from "../../model/project";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";

const Admin = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sucessMsg, setSuccessMsg] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const { addNotification, removeLastNotification } = useApp();
  const { project, setProjectOrUndefined } = useProject();

  const [evilInput, setEvilInput] = useState("");

  useEffect(() => {
    if (project) {
      fillUpForm(project);
    }

    return () => {
      setProjectOrUndefined(undefined);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId, setProjectOrUndefined, project]);

  async function postProject(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t("admin.err_invalid_form"));
      return;
    }
    const api = createApiClient();
    try {
      const projectCreation: Project = {
        _id: project ? project._id : undefined,
        title: title,
        description: description,
        link: link,
        tag: tags,
        version: version,
        timestamp: project ? project.date : Date.now(),
      };
      addNotification("Posting...");
      if (project) {
        await api.updateProject(projectCreation);
        setSuccessMsg(t("admin.suc_network_update"));
      } else {
        await api.postProject(projectCreation);
        setSuccessMsg(t("admin.suc_network"));
      }
    } catch (e) {
      setErrorMsg(t("admin.err_network"));
    } finally {
      removeLastNotification();
      setProjectOrUndefined(undefined);
      const timeout = setTimeout(() => {
        resetMessages();
      }, 2000);
      setTimeoutId(timeout);
      resetForm();
    }
  }

  function fillUpForm(updateProject: Project) {
    setErrorMsg("");
    setSuccessMsg("");
    setTitle(updateProject.title);
    setLink(updateProject.link);
    setDescription(updateProject.description);
    setTags(updateProject.tag);
    setVersion(updateProject.version);
  }

  function resetMessages() {
    setErrorMsg("");
    setSuccessMsg("");
  }

  function resetForm() {
    setTitle("");
    setLink("");
    setDescription("");
    setTags("");
    setVersion("");
  }

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeLink(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTags(e: ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    onChangeAnyInput();
  }

  function onChangeVersion(e: ChangeEvent<HTMLInputElement>) {
    setVersion(e.target.value);
    onChangeAnyInput();
  }

  function onChangeEvilInput(e: ChangeEvent<HTMLInputElement>) {
    setEvilInput(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    return title !== "" && description !== "" && tags !== "" && version !== "";
  }

  function dismissError() {
    setErrorMsg("");
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("admin.header")}</TitleForm>
        <LoginPannel onSubmit={postProject} onReset={resetForm}>
          {errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          {sucessMsg && <SuccessDescription>{sucessMsg}</SuccessDescription>}
          <LoginForm
            name="title"
            type="text"
            placeholder={t("admin.input_title")}
            value={title}
            onChange={onChangeTitle}
          />
          <LoginForm
            name="description"
            type="text"
            placeholder={t("admin.input_description")}
            value={description}
            onChange={onChangeDescription}
          />
          <LoginForm
            name="link"
            type="text"
            placeholder={t("admin.input_link")}
            value={link}
            onChange={onChangeLink}
          />
          <LoginForm
            name="tags"
            type="text"
            placeholder={t("admin.input_tags")}
            value={tags}
            onChange={onChangeTags}
          />
          <LoginForm
            name="version"
            type="text"
            placeholder={t("admin.input_version")}
            value={version}
            onChange={onChangeVersion}
          />
          <ButtonWrapper>
            <ButtonCancel
              type="reset"
              value={
                t("admin.button_delete") != null
                  ? (t("admin.button_delete") as string)
                  : "Delete"
              }
            />
            <ButtonForm
              type="submit"
              value={
                t("admin.button_accept") != null
                  ? (t("admin.button_accept") as string)
                  : "Publish"
              }
            />
          </ButtonWrapper>
        </LoginPannel>
      </ContentWrapper>
      <ContentWrapper>
        <EvilInput>
          <LoginForm
            name="img"
            type="text"
            placeholder="image"
            value={evilInput}
            onChange={onChangeEvilInput}
          />
          <EvilDiv
            dangerouslySetInnerHTML={{
              __html: `<img  style="width: 200px;" src="${evilInput}"/>`,
            }}
          />
        </EvilInput>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }

  @media (max-width: 500px) {
    justify-content: stretch;
    justify-items: stretch;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LoginPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
    padding: 20px;
  }
`;

const EvilInput = styled.div`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
    padding: 20px;
  }
`;

const EvilDiv = styled.div`
  padding: 20px 40px;
`;

const ErrorDescription = styled(Caption)`
  color: ${themes.light.warning};
`;

const SuccessDescription = styled(Caption)`
  color: ${themes.light.primary};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.primary};
  }
`;

const LoginForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-gap: 10px;
  justify-content: end;

  @media (max-width: 500px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: stretch;
  }
`;

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;

const ButtonCancel = styled(ButtonForm)`
  background-color: ${themes.light.warning};
`;

export default Admin;
