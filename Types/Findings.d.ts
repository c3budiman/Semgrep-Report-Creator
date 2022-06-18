export interface Meta {
    semgrep_version?: string;
    repository?: string;
    repo_url?: null;
    branch?: string;
    ci_job_url?: null;
    commit?: string;
    commit_author_email?: string;
    commit_author_name?: string;
    commit_author_username?: null;
    commit_author_image_url?: null;
    commit_title?: string;
    on?: string;
    pull_request_author_username?: null;
    pull_request_author_image_url?: null;
    pull_request_id?: null;
    pull_request_title?: null;
    scan_environment?: string;
    is_full_scan?: boolean;
    is_sca_scan?: boolean;
    ignored_files?: any[];
}

export interface SemgrepPolicy {
    id?: number;
    name?: string;
    slug?: string;
}

export interface Metadata {
    "owasp-web"?: string;
    owasp?: string;
    cwe?: string;
    license?: string;
    source?: string;
    shortlink?: string;
    "dev.semgrep.actions"?: any[];
    "semgrep.policy"?: SemgrepPolicy;
    "semgrep.url"?: string;
    "semgrep.ruleset"?: string;
}

export interface Finding {
    check_id?: string;
    path?: string;
    line?: number;
    column?: number;
    end_line?: number;
    end_column?: number;
    message?: string;
    severity?: number;
    index?: number;
    commit_date?: Date;
    syntactic_id?: string;
    metadata?: Metadata;
    is_blocking?: boolean;
    match_based_id?: string;
}

export interface FirstSeenScan {
    id?: number;
    meta?: Meta;
}

export interface Repository {
    name?: string;
}

export interface FindingsType {
    ref?: string;
    id?: number;
    syntactic_id?: string;
    match_based_id?: null;
    finding?: Finding;
    state?: string;
    repository?: Repository;
    first_seen_scan?: FirstSeenScan;
    removed_by_pr_event?: boolean;
    triage_state?: string;
    relevant_since?: string;
    aggregate_state?: string;
    note?: null;
}
