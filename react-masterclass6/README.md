# #6 STATE MANAGEMENT

## 6.5 To Do Setup

## 6.6 Forms

> ### React Hook Form
>
> 많은 form들을 관리해야하거나, validation을 하는데 시간을 절약하고 싶을때 사용하면 유용하다.
>
> [React Hook Form - 공식문서](https://www.react-hook-form.com/)
>
> #### React Hook Form 설치
>
> ```
> npm install react-hook-form
> ```
>
> &nbsp;

## 6.7 Form Validation

## 6.8 Form Errors

RegExp(정규식표현)

[regex101](https://regex101.com/)  
[regexpal](https://www.regexpal.com/)

## 6.9 Custom Validation

`setError()` 는 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 한다.

패스워드1 패스워드2 다를때 에러메세지 출력

# 최종 정리 참고

1. `useForm`을 import
2. 컴포넌트에서 `useForm`을 호출하면 `register`와 `handleSubmit`이 제공된다.
3. `register` 함수를 form에 있는 모든 input에서 호출한다.

   - `required`를 사용해 단순히 boolean으로 설정할 수 있고 메세지를 적을 수도 있다.
   - `minLength`,`maxLength` 최소최대 글자수 제한을 설정할 수 있다.
   - `pattern`을 사용해 정규식으로 검사 가능하다.
   - `validate`를 사용해 내가 만든 함수를 이용해서 검사도 가능하다.

4. 에러메세지 띄우기
   - `errors`를 `formState`의 내부에서 가져온 다음, 출력할 HTML태그안에 넣어준다.
5. form에 기본값 설정하기
   - `defaultValues`를 사용해 원하는 항목을 설정하면 된다.
6. `setError함수`를 사용해 추가적인 에러를 설정할 수 있다.
   - 특정한 항목에 에러를 발생시키고 싶다면, 그 항목의 이름을 적고 메세지를 보내면 된다. (예-비번1 과 비번2가 동일)
   - "서버가 끊겼다" 같은 코드에서의 에러를 발생시키고 싶다면, extraError 같은 이름의 항목을 추가한 다음, 메세지를 전달해주면 된다.
   - `shouldFocus`는 사용자가 form을 submit할때 에러를 발생시키면 커서를 해당 input에 focus 시켜주는 것이다.
