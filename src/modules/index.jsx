import Login from '@modules/authentication/login'
import ForgetPassword from '@modules/authentication/forgetPassword'
import ResetPassword from '@modules/authentication/resetPassword'
import Layout from '@modules/layout'
import AppliedJobs from '@modules/appliedJobs'
import TeamAppliedJobs from '@modules/teamAppliedJobs'
import Dashboard from '@modules/dashboard'
import JobsFilter from '@/modules/jobsFilter'
import JobsUploader from '@modules/jobsUploader'
import { Companies, JobSourceBlocking } from '@modules/userManagement'
import Roles from '@modules/userManagement/roles'
import Users from '@modules/userManagement/users'
import Teams from '@modules/userManagement/teams'
import Team from '@modules/userManagement/team'
import Integrations from '@modules/settings/integrations'
import Profile from '@modules/profile'
import CoverLetter from './coverLetter'
import Scrapper from '@modules/scrapper'
import Logger from '@modules/logger'
import ResumeBuilder from '@modules/settings/resumeBuilder'
import Pseudos from '@modules/pseudos'
import Vertical from '@/modules/pseudos/vertical'
import ApplyForJob from '@modules/jobsFilter/applyForJob'
import GenericSkills from '@modules/pseudos/genericSkills'
import Status from '@modules/leadManagement/status'
import CompanyStatus from '@modules/leadManagement/companyStatus'
import Phases from '@modules/leadManagement/phases'
import Leads from '@modules/leadManagement/leads'
import LeadsTable from '@modules/leadManagement/leads/table'
import Candidates from '@modules/leadManagement/candidates'
import Designations from '@modules/leadManagement/designations'
import ExposedCandidates from '@modules/leadManagement/exposedCandidates'
import ConvertToLead from '@modules/appliedJobs/convertToLead'
import AssignCandidate from '@modules/leadManagement/assignCandidate'
import Analytics from '@modules/analytics'
import JobCompanies from '@modules/jobComapnies'
import ApiLogs from '@modules/settings/apiLogs'
import Regions from '@modules/settings/regions'
import MyProfile from '@modules/leadManagement/candidateProfile'
import Permissions from '@modules/settings/permissions'
import TechStacksCategories from '@modules/settings/techStacksCategories'
import LeadNotes from '@/modules/leadManagement/leadNotes'
import ExposedTeams from '@modules/leadManagement/exposedTeams'
import EditHistory from '@modules/editHistory'
import JobPortalV2 from '@modules/jobPortal-v2'
import JobSources from '@modules/settings/jobSources'

export {
    TeamAppliedJobs,
    AppliedJobs,
    JobsFilter,
    JobsUploader,
    Dashboard,
    Teams,
    Team,
    Login,
    ForgetPassword,
    ResetPassword,
    Layout as AppLayout,
    Companies,
    Roles,
    Users,
    Integrations,
    JobSourceBlocking,
    Profile,
    CoverLetter,
    Scrapper,
    Logger,
    ResumeBuilder,
    Pseudos,
    Vertical,
    ApplyForJob,
    GenericSkills,
    Status,
    CompanyStatus,
    Phases,
    Leads,
    Candidates,
    Designations,
    ExposedCandidates,
    ConvertToLead,
    AssignCandidate,
    Analytics,
    JobCompanies,
    ApiLogs,
    Regions,
    MyProfile,
    Permissions,
    LeadsTable,
    TechStacksCategories,
    LeadNotes,
    ExposedTeams,
    EditHistory,
    JobPortalV2,
    JobSources,
}
